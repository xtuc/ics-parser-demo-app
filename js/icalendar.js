import moment from "moment";

// https://tools.ietf.org/html/rfc5545
export function parse(source) {
  const contentLines = source.split("\r\n");
  let starts = "unknown";
  let location = "unknown";

  contentLines.forEach(line => {
    const [name, value] = line.split(":");

    switch (name) {
      case "LOCATION":
        location = value;
        break;
      case "DTSTAMP":
        starts = moment(value, "YYYYMMDDTHHmmssZ").format("YYYY-MM-DD HH:mm:ss");
        break;
    }
  });

  return `Starts at ${starts} in ${location}.`;
}
