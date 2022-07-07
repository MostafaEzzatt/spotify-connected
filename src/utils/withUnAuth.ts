import React from "react";

export default function protectRotue<T>(
    WrappedComponent: React.ComponentType<T>
) {
    function UnAuth(props: T) {
        console.log("Loading Page From Protected Route");

        if (typeof WrappedComponent !== "function") {
            return "";
        }

        return <WrappedComponent {...props} />;
    }

    UnAuth.displayName =
        WrappedComponent.displayName || WrappedComponent.name || "Component";

    return UnAuth;
}
