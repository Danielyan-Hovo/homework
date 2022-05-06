import Comments from "./comments/Comments";
import FormValidator from "./comments/FormValidator";

const App = () => {
    return (
        <div className='App'>
            <Comments
                currentUserId="1"
            />
            <FormValidator />

        </div>
    );
};

export default App;
