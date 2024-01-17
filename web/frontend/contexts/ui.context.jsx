import React from "react";

const initialState = {
  shop: {},
  modal: {
    view: undefined,
    isOpen: false,
    data: null,
  },
  toast: {
    active: false,
    message: "",
  },
  locations: [],
};

export const UIContext = React.createContext(initialState);

UIContext.displayName = "UIContext";

function uiReducer(state, action) {
  switch (action.type) {
    case "SET_SHOP": {
      return {
        ...state,
        shop: action.payload,
      };
    }
    case "SET_LOCATION": {
      return {
        ...state,
        locations: action.payload,
      };
    }
    case "OPEN_MODAL": {
      return {
        ...state,
        modal: {
          ...state.modal,
          view: action.payload.view,
          isOpen: action.payload.isOpen,
          data: action.payload.data,
        },
      };
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        modal: {
          ...state.modal,
          view: undefined,
          isOpen: false,
          data: null,
        },
      };
    }
    case "TOGGLE_TOAST": {
      return {
        ...state,
        toast: {
          ...state.toast,
          active: action.payload.active,
          message: action.payload.message,
        },
      };
    }
  }
}

export const UIProvider = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const setShop = (payload) => dispatch({ type: "SET_SHOP", payload });

  const setLocations = (payload) => dispatch({ type: "SET_LOCATION", payload });

  const setOpenModal = (payload) => dispatch({ type: "OPEN_MODAL", payload });

  const setCloseModal = () => dispatch({ type: "CLOSE_MODAL" });

  const setToggleToast = (payload) =>
    dispatch({ type: "TOGGLE_TOAST", payload });

  const value = React.useMemo(
    () => ({
      ...state,
      setShop,
      setOpenModal,
      setCloseModal,
      setToggleToast,
      setLocations,
    }),
    [state]
  );
  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);
