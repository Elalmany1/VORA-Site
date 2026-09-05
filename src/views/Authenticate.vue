<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Logo Section -->
      <div class="logo-wrapper">
        <svg class="logo-icon" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>

      <h1 class="form-title">Secure Authentication Portal</h1>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="login-form">
        <!-- Corporate Email -->
        <div class="form-group">
          <label class="form-label">CORPORATE EMAIL</label>
          <div class="input-wrapper">
            <svg class="field-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <input 
              type="email" 
              v-model="form.email" 
              placeholder="name@company.com" 
              required 
              class="form-input"
            />
          </div>
        </div>

        <!-- Access Key (Password) -->
        <div class="form-group">
          <div class="label-row">
            <label class="form-label">ACCESS KEY</label>
            <a href="#" @click.prevent="recoverKey" class="recover-link">Recover Key</a>
          </div>
          <div class="input-wrapper">
            <svg class="field-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input 
              :type="showPassword ? 'text' : 'password'" 
              v-model="form.password" 
              placeholder="••••••••" 
              required 
              class="form-input"
            />
            <button type="button" class="eye-btn" @click="showPassword = !showPassword">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
        </div>

        <!-- Maintain Session Checkbox -->
        <div class="checkbox-group">
          <input type="checkbox" id="maintainSession" v-model="form.maintainSession" class="checkbox-input" />
          <label for="maintainSession" class="checkbox-label">Maintain Session</label>
        </div>

        <!-- Authenticate Button -->
        <button type="submit" class="submit-btn">
          Authenticate &rarr;
        </button>
      </form>

      <!-- Divider -->
      <div class="divider">
        <span>OR</span>
      </div>

      <!-- Social / SSO Logins -->
      <div class="sso-buttons">
        <button type="button" class="sso-btn" @click="loginWithGoogle">
          <span class="provider-icon font-bold">G</span>
          <span>Continue with Google</span>
        </button>
        <button type="button" class="sso-btn" @click="loginWithSSO">
          <svg class="provider-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <span>Enterprise SSO</span>
        </button>
      </div>

      <!-- Footer Prompt -->
      <div class="register-prompt">
        <span>Unregistered Personnel? </span>
        <router-link to="/signup" class="register-link">Request Clearance</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      showPassword: false,
      form: {
        email: '',
        password: '',
        maintainSession: false
      }
    }
  },
  methods: {
    handleLogin() {
      console.log('Authentication payload:', this.form);
    },
    recoverKey() {
      console.log('Key recovery requested');
    },
    loginWithGoogle() {
      console.log('Google login initiated');
    },
    loginWithSSO() {
      console.log('Enterprise SSO initiated');
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1a1a1a;
}

.login-card {
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-wrapper {
  margin-bottom: 12px;
  color: #1a1a1a;
}

.form-title {
  font-size: 15px;
  font-weight: 500;
  color: #444444;
  margin-bottom: 28px;
  text-align: center;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-label {
  font-size: 11px;
  font-weight: 700;
  color: #555555;
  letter-spacing: 0.5px;
}

.recover-link {
  font-size: 11px;
  color: #666666;
  text-decoration: none;
}

.recover-link:hover {
  text-decoration: underline;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.field-icon {
  position: absolute;
  left: 12px;
  color: #888888;
  pointer-events: none;
}

.form-input {
  width: 100%;
  padding: 10px 38px;
  font-size: 13px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background-color: #fcfcfc;
  outline: none;
  transition: border-color 0.2s;
}

.form-input:focus {
  border-color: #000000;
  background-color: #ffffff;
}

.eye-btn {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: #888888;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.checkbox-input {
  cursor: pointer;
}

.checkbox-label {
  font-size: 12px;
  color: #555555;
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  background-color: #000000;
  color: #ffffff;
  border: none;
  padding: 12px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8px;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #222222;
}

.divider {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
  line-height: 0.1em;
  margin: 24px 0;
}

.divider span {
  background: #fff;
  padding: 0 10px;
  font-size: 10px;
  font-weight: 700;
  color: #a0a0a0;
  letter-spacing: 0.5px;
}

.sso-buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sso-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  padding: 10px;
  font-size: 13px;
  font-weight: 600;
  color: #333333;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.sso-btn:hover {
  background-color: #f9fafb;
}

.provider-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.font-bold {
  font-weight: 700;
}

.register-prompt {
  margin-top: 28px;
  font-size: 12px;
  color: #666666;
  text-align: center;
}

.register-link {
  color: #000000;
  font-weight: 700;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style>