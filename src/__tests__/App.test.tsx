/**
 * App root component smoke test
 */

import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../../App';

// Mock react-native-config so env validation doesn't fail in tests
jest.mock('react-native-config', () => ({
  APP_ENV: 'dev',
  APP_NAME: 'iMediaSave Test',
  APP_BUNDLE_ID: 'com.imediasave.app.test',
  APP_VERSION_NAME: '1.0.0',
  API_BASE_URL: 'https://api-dev.imediasave.com',
  API_TIMEOUT_MS: '30000',
  FEATURE_ANALYTICS: '0',
  FEATURE_CRASHLYTICS: '0',
  FEATURE_PUSH_NOTIFICATIONS: '1',
}));

describe('App', () => {
  it('renders without crashing', () => {
    const {getByText} = render(<App />);
    expect(getByText('iMediaSave')).toBeTruthy();
  });

  it('renders the welcome section', () => {
    const {getByText} = render(<App />);
    expect(getByText('Welcome')).toBeTruthy();
  });
});
