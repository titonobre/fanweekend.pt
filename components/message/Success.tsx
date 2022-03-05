import { CheckCircleIcon } from "@chakra-ui/icons";
import Message, { Props } from "./Message";

export default function Success({ icon, ...props }: Props) {
  return <Message icon={icon || <CheckCircleIcon boxSize="50px" color="green.500" />} {...props} />;
}
