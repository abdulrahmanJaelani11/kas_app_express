<template>
  <aside class="left-sidebar">
    <!-- Sidebar scroll-->
    <div>
      <div class="brand-logo d-flex align-items-center justify-content-between">
        <router-link :to="{ name: 'home' }" class="text-nowrap logo-img">
          <img src="assets/images/logos/dark-logo.svg" width="180" alt="" />
        </router-link>
        <div
          class="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
          id="sidebarCollapse"
        >
          <i class="ti ti-x fs-8"></i>
        </div>
      </div>
      <!-- Sidebar navigation-->
      <nav class="sidebar-nav scroll-sidebar" data-simplebar="">
        <ul id="sidebarnav">
          <!-- <li class="nav-small-cap">
            <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
            <span class="hide-menu">Master</span>
          </li> -->
          <li class="sidebar-item">
            <router-link
              class="sidebar-link"
              aria-expanded="false"
              :to="{ name: 'home' }"
            >
              <span>
                <i class="ti ti-layout-dashboard"></i>
              </span>
              <span class="hide-menu">Dashboard</span>
            </router-link>
          </li>
          <li class="nav-small-cap">
            <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
            <span class="hide-menu">MASTER</span>
          </li>
          <li class="sidebar-item">
            <router-link
              class="sidebar-link"
              aria-expanded="false"
              :to="{ name: 'Status' }"
            >
              <span>
                <i class="ti ti-alert-circle"></i>
              </span>
              <span class="hide-menu">Status</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link
              class="sidebar-link"
              aria-expanded="false"
              :to="{ name: 'Anggota' }"
            >
              <span>
                <i class="ti ti-article"></i>
              </span>
              <span class="hide-menu">Anggota</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link
              class="sidebar-link"
              aria-expanded="false"
              :to="{ name: 'Cards' }"
            >
              <span>
                <i class="ti ti-cards"></i>
              </span>
              <span class="hide-menu">Card</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link
              class="sidebar-link"
              aria-expanded="false"
              :to="{ name: 'Forms' }"
            >
              <span>
                <i class="ti ti-file-description"></i>
              </span>
              <span class="hide-menu">Forms</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link
              class="sidebar-link"
              aria-expanded="false"
              :to="{ name: 'Typography' }"
            >
              <span>
                <i class="ti ti-typography"></i>
              </span>
              <span class="hide-menu">Typography</span>
            </router-link>
          </li>
          <li class="nav-small-cap">
            <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
            <span class="hide-menu">AUTH</span>
          </li>
          <li class="sidebar-item">
            <router-link
              class="sidebar-link"
              aria-expanded="false"
              :to="{ name: 'Login' }"
            >
              <span>
                <i class="ti ti-login"></i>
              </span>
              <span class="hide-menu">Login</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link
              class="sidebar-link"
              aria-expanded="false"
              :to="{ name: 'Register' }"
            >
              <span>
                <i class="ti ti-user-plus"></i>
              </span>
              <span class="hide-menu">Register</span>
            </router-link>
          </li>
          <li class="nav-small-cap">
            <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
            <span class="hide-menu">EXTRA</span>
          </li>
          <li class="sidebar-item">
            <router-link
              class="sidebar-link"
              aria-expanded="false"
              :to="{ name: 'Icons' }"
            >
              <span>
                <i class="ti ti-mood-happy"></i>
              </span>
              <span class="hide-menu">Icons</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link
              class="sidebar-link"
              aria-expanded="false"
              :to="{ name: 'SamplePage' }"
            >
              <span>
                <i class="ti ti-aperture"></i>
              </span>
              <span class="hide-menu">Sample Page</span>
            </router-link>
          </li>
        </ul>
        <div
          class="unlimited-access hide-menu bg-light-primary position-relative mb-7 mt-5 rounded"
        >
          <div class="d-flex">
            <div class="unlimited-access-title me-3">
              <h6 class="fw-semibold fs-4 mb-6 text-dark w-85">
                Upgrade to pro
              </h6>
              <a
                href="https://adminmart.com/product/modernize-bootstrap-5-admin-template/"
                target="_blank"
                class="btn btn-primary fs-2 fw-semibold lh-sm"
                >Buy Pro</a
              >
            </div>
            <div class="unlimited-access-img">
              <img
                src="assets/images/backgrounds/rocket.png"
                alt=""
                class="img-fluid"
              />
            </div>
          </div>
        </div>
      </nav>
      <!-- End Sidebar navigation -->
    </div>
    <!-- End Sidebar scroll-->
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>
