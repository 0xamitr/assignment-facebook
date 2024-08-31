"use client";

import { SessionProvider, getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SessionProviderWrapper({ children, session }) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}