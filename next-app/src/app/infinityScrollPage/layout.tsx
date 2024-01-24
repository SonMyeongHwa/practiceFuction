"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Layout = (props: any) => {
  return (
    <QueryClientProvider client={queryClient}>
      <h2>무한 스크롤</h2>
      {props.children}
    </QueryClientProvider>
  );
};

export default Layout;
