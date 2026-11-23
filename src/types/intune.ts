export namespace Intune {
  export enum EnrollmentStatus {
    NOT_ENROLLED = 'notEnrolled',
    PENDING = 'pending',
    ENROLLED = 'enrolled',
    FAILED = 'failed',
  }

  export type Mode = 'standalone' | 'msal';

  export type Status = {
    status: EnrollmentStatus;
    upn?: string;
    policyApplied: boolean;
    mode: Mode;
  };

  export type Error = {
    code: 'ENROLLMENT_FAILED' | 'COMPANY_PORTAL_REQUIRED' | 'NOT_SUPPORTED' | 'SDK_ERROR';
    message: string;
    nativeCode?: string | number;
    platform: 'ios' | 'android';
  };

  export type Event =
    | { type: 'statusChanged'; status: Status }
    | { type: 'wiped' }
    | { type: 'error'; error: Error };
}
