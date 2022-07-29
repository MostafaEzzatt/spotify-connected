import React from "react";

const CreateUserProfile = () => {
    return (
        <button
            onClick={() => createProfile()}
            className="sticky bottom-6 left-6 rounded-full bg-highlight-press px-4 py-2 text-white drop-shadow-md hover:bg-highlight"
        >
            Create Profile
        </button>
    );
};

export default CreateUserProfile;
