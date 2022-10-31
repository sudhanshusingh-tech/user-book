export const fetchRequest = (
  url,
  methodInCaps = "",
  headersObj = "",
  stringifiedBodyObject = ""
) => {
  if (
    methodInCaps == "POST" ||
    methodInCaps == "DELETE" ||
    methodInCaps == "PATCH" ||
    methodInCaps == "PUT"
  ) {
    (async () => {
      try {
        const response = await fetch(url, {
          method: methodInCaps,
          headers: headersObj,
          body: stringifiedBodyObject,
        });
        const responseJson = await response.json();
        if (response.ok) {
          console.log(responseJson.message);
        } else {
          console.log(responseJson.error);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  } else {
    (async () => {
      try {
        const response = await fetch(url);
        const responseJson = await response.json();
        if (response.ok) {
          console.log(responseJson.message);
        } else {
          console.log("Something went wrong");
          console.log(responseJson.error);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }
  return false;
};
