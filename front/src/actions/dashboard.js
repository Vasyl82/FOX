const getDashboardLayout = (userRole = "Dum", projectId = null) => {
  return (dispatch) => {
    let dashboard = null;
    switch (userRole) {
      case "Contr":
        dashboard = {
          sidebar: [
            {
              _tag: "CSidebarNavItem",
              name: "Project Detail",
              to: `/projects/${projectId}`,
              icon: "cil-speedometer",
            },
            {
              _tag: "CSidebarNavItem",
              icon: "cil-file",
              name: "Related docs",
              to: `/projects/${projectId}/related_documents`,
            },
            {
              _tag: "CSidebarNavItem",
              icon: "cil-user",
              name: "PTW",
              to: `/projects/${projectId}/ptw`,
            },
            // {
            //   _tag: "CSidebarNavItem",
            //   name: "3. Submit Proposal",
            //   to: `/projects/${projectId}/submit_proposal`,
            // },
          ],
          header_nav: [
            {
              _tag: "CHeaderNavItem",
              id: "head_nav_workers",
              className: "px-3",
              _children: [
                {
                  _tag: "FoxHeaderNavLink",
                  id: "head_nav_link_workers",
                  to: "/workers",
                  linktext: "Workers",
                },
              ],
            },
            {
              _tag: "CHeaderNavItem",
              id: "head_nav_projects",
              className: "px-3",
              _children: [
                {
                  _tag: "FoxHeaderNavLink",
                  id: "head_nav_link_projects",
                  to: "/projects",
                  linktext: "Projects",
                },
              ],
            },
            {
              _tag: "CHeaderNavItem",
              id: "head_nav_safety_video",
              className: "px-3",
              _children: [
                {
                  _tag: "FoxHeaderNavLink",
                  id: "head_nav_link_safety_video",
                  to: "/safety/video",
                  linktext: "Safety",
                },
              ],
            },
          ],
        };
        break;
      case "CliMan":
        dashboard = {
          sidebar: [
            {
              _tag: "CSidebarNavItem",
              name: "Dashboard",
              to: "/dashboard",
              icon: "cil-speedometer",
            },
          ],
          header_nav: [
            {
              _tag: "CHeaderNavItem",
              id: "head_nav_approvals",
              className: "px-3",
              _children: [
                {
                  _tag: "FoxHeaderNavLink",
                  id: "head_nav_link_approvals",
                  to: "/approvals",
                  linktext: "Approvals",
                },
              ],
            },
            {
              _tag: "CHeaderNavItem",
              id: "head_nav_current",
              className: "px-3",
              _children: [
                {
                  _tag: "FoxHeaderNavLink",
                  id: "head_nav_link_projects",
                  to: "/projects",
                  linktext: "Projects",
                },
              ],
            },
            {
              _tag: "CHeaderNavItem",
              id: "head_nav_safety_video",
              className: "px-3",
              _children: [
                {
                  _tag: "FoxHeaderNavLink",
                  id: "head_nav_link_safety_video",
                  to: "/safety/video",
                  linktext: "Safety",
                },
              ],
            },
          ],
        };
        break;
      case "CliAdm":
        dashboard = {
          sidebar: [
            {
              _tag: "CSidebarNavItem",
              name: "Dashboard",
              to: "/dashboard",
              icon: "cil-speedometer",
            },
          ],
          header_nav: [
            {
              _tag: "CHeaderNavItem",
              id: "head_nav_projects",
              className: "px-3",
              _children: [
                {
                  _tag: "FoxHeaderNavLink",
                  id: "head_nav_link_projects",
                  to: "/projects",
                  linktext: "Projects",
                },
              ],
            },
            {
              _tag: "CHeaderNavItem",
              id: "head_nav_managers",
              className: "px-3",
              _children: [
                {
                  _tag: "FoxHeaderNavLink",
                  id: "head_nav_link_managers",
                  to: "/managers",
                  linktext: "Managers",
                },
              ],
            },
            {
              _tag: "CHeaderNavItem",
              id: "head_nav_contractors",
              className: "px-3",
              _children: [
                {
                  _tag: "FoxHeaderNavLink",
                  id: "head_nav_link_contractors",
                  to: "/contractors",
                  linktext: "Contractors",
                },
              ],
            },
            {
              _tag: "CHeaderNavItem",
              id: "head_nav_safety_presets",
              className: "px-3",
              _children: [
                {
                  _tag: "FoxHeaderNavLink",
                  id: "head_nav_link_safety_presets",
                  to: "/safety/presets",
                  linktext: "Safety",
                },
              ],
            },
          ],
        };
        break;
      default:
        dashboard = {
          sidebar: [
            {
              _tag: "CSidebarNavItem",
              name: "Dashboard",
              to: "/dashboard",
              icon: "cil-speedometer",
            },
          ],
          header_nav: [
            {
              _tag: "CHeaderNavItem",
              id: "head_nav_example",
              className: "px-3",
              _children: [
                {
                  _tag: "FoxHeaderNavLink",
                  id: "head_nav_link_example",
                  to: "/",
                  linktext: "Example",
                },
              ],
            },
          ],
        };
        break;
    }
    dispatch(initiateDashboard(dashboard));
    return Promise.resolve();
  };
};

const updateSideBar = (sidebar) => {
  return (dispatch) => {
    dispatch(newSideBar(sidebar));
  };
};

const updateHeaderNav = (headerNav) => {
  return (dispatch) => {
    dispatch(newHeaderNav(headerNav));
  };
};

const initiateDashboard = (dashboard) => ({
  type: "INITIATE_DASHBOARD",
  sidebar: dashboard.sidebar,
  headerNav: dashboard.header_nav,
});

const newSideBar = (sidebar) => ({
  type: "UPDATE_SIDEBAR",
  sidebar: sidebar,
});

const newHeaderNav = (headerNav) => ({
  type: "UPDATE_HEADER_NAV",
  headerNav: headerNav,
});

export default getDashboardLayout;
