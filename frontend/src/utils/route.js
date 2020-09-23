export const formatRoute = (routes = [{}], newRoutes, father) => {
  routes.forEach((element) => {
    if (father) {
      newRoutes.push({ ...element, path: father + element.path });
      if (element.children) {
        newRoutes = formatRoute(
          element.children,
          newRoutes,
          father + element.path
        );
      }
    } else {
      newRoutes.push(element);
      if (element.children) {
        newRoutes = formatRoute(element.children, newRoutes, element.path);
      }
    }
  });
  return newRoutes;
};

export const formatNavRoute = (routes, newRoutes, father) => {
  routes.forEach((element) => {
    newRoutes[
      !element.path ? father.substring(1) : element.path.substring(1)
    ] = {
      name: element.name,
      url: father + element.path,
    };
    if (element.children) {
      newRoutes = formatNavRoute(
        element.children,
        newRoutes,
        father + element.path
      );
    }
  });
  return newRoutes;
};
