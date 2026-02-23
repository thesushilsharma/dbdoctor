"use client";

import { useActionState } from "react";
import { Activity, AlertTriangle, CheckCircle2 } from "lucide-react";
import { dbSmokeTestAction } from "@/lib/actions/dbCheck.actions";
import type { DbSmokeTestState } from "@/lib/actions/dbCheck.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DbSmokeTest() {
  const [state, formAction, isPending] = useActionState<
    DbSmokeTestState,
    FormData
  >(dbSmokeTestAction, null);

  const icon =
    state == null ? null : state.ok ? (
      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
    ) : (
      <AlertTriangle className="h-4 w-4 text-destructive" />
    );

  return (
    <Card className="border-border/70 bg-card/70 shadow-sm">
      <CardHeader className="flex items-center justify-between gap-3">
        <CardTitle className="text-base font-semibold tracking-tight">
          Database connectivity
        </CardTitle>
        <form action={formAction}>
          <Button
            type="submit"
            size="sm"
            className="h-7 px-3 text-xs"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Activity className="mr-1 h-3 w-3 animate-spin" />
                Testing…
              </>
            ) : (
              "Run smoke test"
            )}
          </Button>
        </form>
      </CardHeader>
      <CardContent className="space-y-1 text-xs text-muted-foreground">
        <p>
          Runs a simple query against the connections table using your current
          DATABASE_URL.
        </p>
        {state && (
          <div className="mt-2 flex items-start gap-2 rounded-md border border-border/70 bg-background/60 px-3 py-2">
            {icon}
            <div>
              <p className="font-medium text-foreground">
                {state.ok ? "Connection successful" : "Connection error"}
              </p>
              <p className="mt-0.5 text-[11px] break-all">{state.message}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

