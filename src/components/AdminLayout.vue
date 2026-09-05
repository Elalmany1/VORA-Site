<template>
  <div class="admin-layout">
    <!-- 1. القائمة الجانبية -->
    <aside class="sidebar">
      <div class="logo">VORA</div>
      <nav class="menu">
        <a href="#">Dashboard</a>
        <a href="#">Settings</a>
      </nav>
      <div class="user-profile">Admin User</div>
    </aside>

    <!-- 2. الجزء الأيمن (الهيدر + المحتوى) -->
    <div class="main-wrapper">
      <header class="navbar">
        <input type="text" placeholder="Search..." />
        <div class="icons">🔔 ⚙️ 👤</div>
      </header>

      <!-- هنا بتظهر الصفحة المتغيرة -->
      <main class="content">
        <slot /> <!-- أو <router-view /> -->
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 240px;
  background-color: #1a2238; /* اللون الكحلي الغامق */
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.main-wrapper {
  flex: 1;
  background-color: #f5f6fa;
}
.navbar {
  background: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
}
.content {
  padding: 20px;
}
</style>