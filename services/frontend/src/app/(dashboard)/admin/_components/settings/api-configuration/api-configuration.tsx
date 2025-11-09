import type { Component } from "#/utils/react";
import { useCopyToClipboard } from "#/react/hooks/clipboard";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  Label,
} from "#/react/ui";
import { CheckIcon, CopyIcon } from "lucide-react";

export const APIConfiguration: Component = () => {
  const { copyToClipboard: copyClientID, isCopied: copiedClientID } = useCopyToClipboard();
  const { copyToClipboard: copyClientSecret, isCopied: copiedClientSecret } = useCopyToClipboard();

  return (
    <Card className="py-4 md:py-6">
      <CardHeader className="px-4 md:px-6">
        <CardTitle>API configuration</CardTitle>

        <CardDescription>Manage your API credentials for the website HelloAsso</CardDescription>
      </CardHeader>

      <CardContent className="px-4 md:px-6">
        <form className="flex flex-col items-start gap-6 w-full">
          <div className="flex flex-col items-start gap-2 w-full">
            <Label htmlFor="client-id" className="font-semibold">Client ID</Label>

            <div className="w-full">
              <InputGroup>
                <InputGroupInput id="client-id" defaultValue="fest_cli_1234567890abcdef" />

                <InputGroupAddon align="inline-end">
                  <InputGroupButton aria-label="Copy" title="Copy" size="icon-xs" onClick={() => copyClientID("fest_cli_1234567890abcdef")}>
                    {copiedClientID ? <CheckIcon /> : <CopyIcon />}
                    {/* <Spinner /> */}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>

              <p className="text-sm text-muted-foreground">Click to copy your client ID</p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <Label htmlFor="client-secret" className="font-semibold">Client secret</Label>

            <div className="w-full">
              <InputGroup>
                <InputGroupInput id="client-secret" type="password" defaultValue="fest_cli_1234567890abcdef" />

                <InputGroupAddon align="inline-end">
                  <InputGroupButton aria-label="Copy" title="Copy" size="icon-xs" onClick={() => copyClientSecret("fest_cli_1234567890abcdef")}>
                    {copiedClientSecret ? <CheckIcon /> : <CopyIcon />}
                    {/* <Spinner /> */}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>

              <p className="text-sm text-muted-foreground">Keep this secret safe</p>
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="justify-end px-4 md:px-6">
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  );
};
