import { ModalFunc } from 'ant-design-vue/lib/modal/Modal';
import { MessageApi } from 'ant-design-vue/lib/message';
import { default as NotificationApi } from 'ant-design-vue/lib/notification/index';

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $message: MessageApi;
    $notification: typeof NotificationApi;
    $info: ModalFunc;
    $success: ModalFunc;
    $error: ModalFunc;
    $warning: ModalFunc;
    $confirm: ModalFunc;
    $destroyAll: () => void;
  }
}
