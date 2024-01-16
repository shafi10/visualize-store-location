import React from "react";

const initialState = {
  shop: {},
  modal: {
    view: undefined,
    isOpen: false,
    data: null,
  },
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
  }
}

export const UIProvider = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const setShop = (payload) => dispatch({ type: "SET_SHOP", payload });

  const setOpenModal = (payload) => dispatch({ type: "OPEN_MODAL", payload });

  const setCloseModal = () => dispatch({ type: "CLOSE_MODAL" });

  const value = React.useMemo(
    () => ({
      ...state,
      setShop,
      setOpenModal,
      setCloseModal,
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
