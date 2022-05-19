var _ = require("lodash");
export const toolBoxData = [
    { name: "input", textToShow: "Text Input" },
    { name: "dropdown", textToShow: "Drop Down" },
    { name: "radio", textToShow: "Multiple Choice" },
    { name: "date", textToShow: "Date" },
    { name: "heading", textToShow: "Heading" },
    //{ name: 'subheading', textToShow: 'Sub Heading' },
    { name: "numberinput", textToShow: "Number Input" },
    { name: "textarea", textToShow: "Multiline Input" }
];

export const getUniqueRandValue = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
    //return '_' + Math.random().toString(36).substr(2, 9)
};

export const reorderItems = (originalArray, newIndex, oldIndex) => {
    const movedItem = originalArray.filter((item, index) => index === oldIndex);
    const remainingItems = originalArray.filter(
        (item, index) => index !== oldIndex
    );
    const reorderedItems = [
        ...remainingItems.slice(0, newIndex),
        movedItem[0],
        ...remainingItems.slice(newIndex)
    ];
    return reorderedItems;
};

export const groupHeadingData = (tasks, sourceIndex, targetIndex) => {
    const sourceParentId = tasks[sourceIndex].parentId;
    const targetParentId = tasks[targetIndex].parentId;
    const sourceId = tasks[sourceIndex].uniqId;
    const targetId = tasks[targetIndex].uniqId;

    if (sourceParentId !== "level-0" && targetParentId === "level-0") {
        tasks[sourceIndex].parentId = targetParentId;
    } else {
        tasks[sourceIndex].parentId = targetId;
    }
    return tasks;
};

export const initialJsonData = {
    pages: [
        {
            pageNumber: 1,
            schema: {
                type: "object",
                properties: {}
            },
            uiSchema: {}
        }
    ]
};

export const convertStateToOutputJSON = (groupedData) => {
    var outputJSON = initialJsonData;
    var pageSchema = outputJSON.pages[0].schema.properties;
    var uiSchema = outputJSON.pages[0].uiSchema;
    var isUiSchemaShow = false;
    var isHeadingContainSubElements = true;

    groupedData = groupedData ? groupedData : {};
    let levelOData = groupedData["level-0"] ? groupedData["level-0"] : [];
    levelOData.map((data, index) => {
        if (data.fieldtype === "heading") {
            let required = [];
            let innerProperties = {};
            let innerUiSchemaProps = {};
            if (!groupedData[data.uniqId]) {
                isHeadingContainSubElements = false;
                alert(
                    "Heading should have sub elements, please add/drag any element under heading"
                );
            }

            groupedData[data.uniqId] &&
            groupedData[data.uniqId].map((item, i) => {
                let typeToDisplay =
                    item.fieldtype === "numberinput" ? "integer" : "string";
                required.push(item.name);

                let extraParams;

                if (item.fieldtype === "radio" || item.fieldtype === "date") {
                    isUiSchemaShow = true;
                    innerUiSchemaProps[item.name] = {
                        "ui:widget":
                            item.fieldtype === "date" ? "alt-date" : item.fieldtype
                    };
                }

                if (item.fieldtype === "date") {
                    extraParams = { format: "date" };
                }
                if (item.fieldtype === "dropdown" || item.fieldtype === "radio") {
                    let optionsToDisplay = [];
                    item.options.map((optionItem) => {
                        optionsToDisplay.push(optionItem.option);
                    });
                    extraParams = { enum: optionsToDisplay };
                }
                innerProperties[item.name] = {
                    type: typeToDisplay,
                    title: item.placeHolderLabel
                };
                innerProperties[item.name] = _.assign(
                    innerProperties[item.name],
                    extraParams
                );
            });

            pageSchema[data.name] = {
                title: data.placeHolderLabel,
                type: "object",
                required: required,
                properties: innerProperties,
                additionalProperties: false
            };

            if (isUiSchemaShow) {
                uiSchema[data.name] = innerUiSchemaProps;
            }
            outputJSON.pages[0].schema.properties = pageSchema;
            outputJSON.pages[0].uiSchema = uiSchema;
        }
    });

    if (!isHeadingContainSubElements) return false;
    //console.log(outputJSON, "outputJSON")
    return outputJSON;
};

export const JSONFormatter = (json) => {
    json = json.replace(/&/g, "&amp").replace(/</g, "&lt").replace(/>/g, "&gt");
    return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
            var cls = "number";
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = "key";
                } else {
                    cls = "string";
                }
            } else if (/true|false/.test(match)) {
                cls = "boolean";
            } else if (/null/.test(match)) {
                cls = "null";
            }
            return '<span class="' + cls + '">' + match + "</span>";
        }
    );
};

export default toolBoxData;
