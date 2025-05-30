'use client'

import { JSX, useEffect, useState } from "react";
import InitSpinner from "@/components/initSpinner";
import { loadSaguaro } from "@/utils/saguaroUtils";
import Alert from "@/components/alert";

interface SolverWrapperProps {
  children: JSX.Element,
}

export default function SolverWrapper({ children }: SolverWrapperProps) {
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    loadSaguaro()
      .then((success) => {
        setLoading(false);
        setLoadFailed(!success);
      });
  }, []);

  return (
    <div>
      { loadFailed
        ? (<Alert
          header="Could not load Saguaro"
          body="Refresh the page or open it in a different browser to try again."
        />)
        : undefined
      }
      { loading ? <InitSpinner /> : children }
    </div>
  );
}