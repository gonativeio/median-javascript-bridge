export namespace FirebaseMessaging {
  export type PermissionResult = {
    granted: boolean;
    status: 'granted' | 'denied' | 'not-determined' | 'provisional';
  };

  export type GetTokenResult = {
    token: string | null;
  };

  export type DeleteTokenResult = {
    success: boolean;
  };

  export type PushNotificationPayload = {
    messageId?: string;
    title?: string;
    body?: string;
    data?: Record<string, string>;
    targetUrl?: string;
    foreground?: boolean;
  };

  export type TopicResult = {
    success: boolean;
    topic?: string;
  };

  export type GetSubscribedTopicsResult = {
    topics: string[];
  };

  export type SetBadgeResult = {
    success: boolean;
    error?: string;
  };

  export type SetForegroundNotificationsEnabledResult = {
    success: boolean;
    error?: string;
  };

  export type NotificationChannel = {
    id: string;
    name: string;
    description?: string;
    importance?: 'high' | 'default' | 'low' | 'min';
    vibration?: boolean;
    showBadge?: boolean;
    lockscreenVisibility?: 'public' | 'private' | 'secret';
  };

  export type ChannelResult = {
    success: boolean;
    error?: string;
  };

  export type ListChannelsResult = {
    channels: NotificationChannel[];
  };
}
