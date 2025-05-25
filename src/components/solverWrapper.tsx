'use client'

import { JSX, useEffect, useState } from "react";
import init from "saguaro_web";
import { Alert, Spinner } from "react-bootstrap";
import InitSpinner from "@/components/initSpinner";
import { loadSaguaro } from "@/utils/saguaroUtils";

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
        ? (<Alert variant="danger">
            Failed to load Saguaro. Refresh the page or open it in a different browser to try again.
        </Alert>)
        : undefined
      }
      { loading ? <InitSpinner /> : children }
    </div>
  );
}