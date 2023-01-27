function handleException() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const fn = descriptor.value;
    descriptor.value = async function () {
      try {
        const result = await fn.apply(this, arguments);
        return result;
      } catch (err) {
        return Promise.reject("User not authorized");
      }
    };
  };
}

export default { handleException };
