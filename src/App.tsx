import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import type { PropsWithChildren } from "react";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import {BrowserRouter, Outlet, Route, Routes} from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { dataProvider } from "./providers/data";
import Dashboard from "@/pages/dashboard.tsx";
import {Home} from "lucide-react";
import {Layout} from "@/components/refine-ui/layout/layout.tsx";
import {BookOpen} from "lucide-react";
import ServicesList from "@/pages/services/list.tsx";
import ServicesCreate from "@/pages/services/create.tsx";

const DEVTOOLS_ENABLED = import.meta.env.DEV;

const Devtools = ({ children }: PropsWithChildren) =>
  DEVTOOLS_ENABLED ? (
    <DevtoolsProvider>
      {children}
      <DevtoolsPanel />
    </DevtoolsProvider>
  ) : (
    <>{children}</>
  );

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <Devtools>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "oVBula-GGnKxt-CsZ558",
              }}
              resources={[
                  {
                      name: 'dashboard',
                      list:'/',
                      meta: { label: 'Home', icon: <Home />}
                  },
                  {
                      name: 'services',
                      list: '/services',
                      create: '/services/create',
                      meta: { label: 'services', icon: <BookOpen />}
                  }
              ]}
            >
              <Routes>
                  <Route element={
                      <Layout>
                        <Outlet />
                      </Layout>
                  }>
                      <Route path='/' element={<Dashboard />}/>
                      <Route path='services'>
                          <Route index element={<ServicesList />} />
                          <Route path='create' element={<ServicesCreate />} />
                      </Route>
                  </Route>

              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </Devtools>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
