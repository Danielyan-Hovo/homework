import Comments from "./Components/Comments";
import FormValidator from "./Components/FormValidator";

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
