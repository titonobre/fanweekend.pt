import { InfoIcon } from "@chakra-ui/icons";

import Message, { Props } from "./Message";

export default function Info({ icon, ...props }: Props) {
  return <Message icon={icon || <InfoIcon boxSize="50px" color="blue.500" />} {...props} />;
}
