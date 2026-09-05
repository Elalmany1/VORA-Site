<template>
  <div class="signup-container">
    <div class="signup-card">
      <!-- Logo Section -->
      <div class="logo-wrapper">
        <svg class="logo-icon" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>

      <h1 class="form-title">Create a technical account</h1>

      <!-- Signup Form -->
      <form @submit.prevent="handleSignup" class="signup-form">
        <!-- Full Name -->
        <div class="form-group">
          <label class="form-label">FULL NAME</label>
          <div class="input-wrapper">
            <svg class="field-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input 
              type="text" 
              v-model="form.fullName" 
              placeholder="Jane Doe" 
              required 
              class="form-input"
            />
          </div>
        </div>

        <!-- Email Address -->
        <div class="form-group">
          <label class="form-label">EMAIL ADDRESS</label>
          <div class="input-wrapper">
            <svg class="field-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <input 
              type="email" 
              v-model="form.email" 
              placeholder="jane.doe@techspec.io" 
              required 
              class="form-input"
            />
          </div>
        </div>

        <!-- Phone Number -->
        <div class="form-group">
          <label class="form-label">PHONE NUMBER</label>
          <div class="input-wrapper">
            <svg class="field-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
            <input 
              type="tel" 
              v-model="form.phone" 
              placeholder="+1 (555) 000-0000" 
              class="form-input"
            />
          </div>
        </div>

        <!-- Password -->
        <div class="form-group">
          <div class="label-row">
            <label class="form-label">PASSWORD</label>
            <span class="strength-label">STRENGTH</span>
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

        <!-- Confirm Password -->
        <div class="form-group">
          <label class="form-label">CONFIRM PASSWORD</label>
          <div class="input-wrapper">
            <svg class="field-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <input 
              :type="showConfirmPassword ? 'text' : 'password'" 
              v-model="form.confirmPassword" 
              placeholder="••••••••" 
              required 
              class="form-input"
            />
            <button type="button" class="eye-btn" @click="showConfirmPassword = !showConfirmPassword">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="submit-btn">
          Create Account &rarr;
        </button>
      </form>

      <!-- Footer Link -->
      <div class="login-prompt">
        <span>Already have an account? </span>
        <router-link to="/login" class="login-link">Sign In</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateAccountView',
  data() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      form: {
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    handleSignup() {
      if (this.form.password !== this.form.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      console.log('Account creation payload:', this.form);
    }
  }
}
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1a1a1a;
}

.signup-card {
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
  font-size: 16px;
  font-weight: 500;
  color: #444444;
  margin-bottom: 28px;
  text-align: center;
}

.signup-form {
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

.strength-label {
  font-size: 10px;
  font-weight: 600;
  color: #888888;
  letter-spacing: 0.5px;
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

.login-prompt {
  margin-top: 24px;
  font-size: 12px;
  color: #666666;
  text-align: center;
}

.login-link {
  color: #000000;
  font-weight: 700;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}
</style>