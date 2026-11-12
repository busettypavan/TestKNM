import { pageHead } from '../../shared/components.js?v=1';
import { button, input } from '../../shared/form.js?v=1';

export const meta = { code: 'S01', name: 'Login', side: 'main', icon: 'login', nav: null, roles: ['trader'] };

export function render({ user, data, params }) {
  return `
    <div class="card">
      ${pageHead('Login', 'Stock Trading Dashboard')}
      <div class="row">
        <label>Email</label>
        ${input({ name: 'email', value: 'arun@example.com', placeholder: 'Enter email' })}
      </div>
      <div class="row">
        <label>Password</label>
        ${input({ name: 'password', type: 'password', value: 'password123', placeholder: 'Enter password' })}
      </div>
      <div class="row">
        ${button('Login', { action: 'login-action' })}
      </div>
    </div>
  `;
}
