// @ts-nocheck

import produce from 'immer'
import { createSelector } from 'reselect'
import { ChatSectionProps } from '../components/main/ChatSection'
import { ChatState, IChatTranslations, InferValueTypes } from '../types'
import { MODULE_NAME, russianTranslations } from './../config/index'
import { IComponentProps } from './../types/main/index'

// #region Actions

export const Types = {
  CHANGE_OPACITY_LOADER: `${MODULE_NAME}/CHAT_STATES/CHANGE_OPACITY_LOADER`,
  CHANGE_ERROR_CONTAINER: `${MODULE_NAME}/CHAT_STATES/CHANGE_ERROR_CONTAINER`,
  SET_CHAT_INFORMATION: `${MODULE_NAME}/CHAT_STATES/SET_CHAT_INFORMATION`,
  SET_CHAT_TRANSLATIONS: `${MODULE_NAME}/CHAT_STATES/SET_CHAT_TRANSLATIONS`,
  SET_COMPONENT_PROPS: `${MODULE_NAME}/CHAT_STATES/SET_COMPONENT_PROPS`,
  SET_CHAT_SECTION_COMPONENT_PROPS: `${MODULE_NAME}/CHAT_STATES/SET_CHAT_SECTION_COMPONENT_PROPS`
} as const

export const actionCreators = {
  changeOpacityLoader: (name: string | null) => ({
    type: Types.CHANGE_OPACITY_LOADER,
    payload: name
  }),
  changeErrorContainer: (name: string | null) => ({
    type: Types.CHANGE_ERROR_CONTAINER,
    payload: name
  }),
  setChatInformation: (chatId: string | null) => ({
    type: Types.SET_CHAT_INFORMATION,
    payload: chatId
  }),
  setChatTranslations: (translations: IChatTranslations) => ({
    type: Types.SET_CHAT_TRANSLATIONS,
    payload: translations
  }),
  setComponentProps: (componentProps: IComponentProps) => ({
    type: Types.SET_COMPONENT_PROPS,
    payload: componentProps
  }),
  setChatSectionComponentProps: (componentProps: ChatSectionProps) => ({
    type: Types.SET_CHAT_SECTION_COMPONENT_PROPS,
    payload: componentProps
  })
}

export type ActionTypes = ReturnType<InferValueTypes<typeof actionCreators>>

// #endregion

// #region Selectors

export const selectAppState = (state: ChatState): AppStates => state.appStates

export const selectOpacityLoader = createSelector(
  selectAppState,
  (appStates) => appStates.opacityLoader
)

export const selectErrorContainer = createSelector(
  selectAppState,
  (appStates) => appStates.errorContainer
)

export const selectTranslations = createSelector(
  selectAppState,
  (appStates) => appStates.translations
)

export const selectComponentProps = createSelector(
  selectAppState,
  (appStates) => appStates.componentProps
)

export const selectChatSectionComponentProps = createSelector(
  selectAppState,
  (appStates) => appStates.chatSectionComponentProps
)

// #endregion

// #region Reducer

const INITIAL_STATE = {
  opacityLoader: null as null | string,
  errorContainer: null as null | string,
  senderUserId: null as null | number,
  receiverUserId: null as null | number,
  translations: russianTranslations as IChatTranslations,
  componentProps: null as IComponentProps,
  chatSectionComponentProps: {} as ChatSectionProps,
  chatId: null as null | string
}

type AppStates = typeof INITIAL_STATE

export default function appStates(
  state = INITIAL_STATE,
  action: ActionTypes
): AppStates {
  return produce(state, (draft) => {
    switch (action.type) {
      case Types.CHANGE_OPACITY_LOADER:
        draft.opacityLoader = action.payload
        break
      case Types.CHANGE_ERROR_CONTAINER:
        draft.errorContainer = action.payload
        break
      case Types.SET_CHAT_INFORMATION:
        draft.chatId = action.payload
        break
      case Types.SET_CHAT_TRANSLATIONS:
        draft.translations = action.payload
        break
      case Types.SET_COMPONENT_PROPS:
        draft.componentProps = action.payload
        break
      case Types.SET_CHAT_SECTION_COMPONENT_PROPS:
        draft.chatSectionComponentProps = action.payload
        break
      default:
        break
    }
  })
}

// #endregion
