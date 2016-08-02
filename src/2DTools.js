
/**
 * substract x and y coordinates beetwen to points
 * @param point1 Object
 * @param point2 Object
 */
export const substractCoordinate = (point1, point2) => ({
  x: point1.x - point2.x,
  y: point1.y - point2.y,
});

/**
 * Add x and y coordinates beetwen to points
 * @param point1 Object
 * @param point2 Object
 */
export const addCoordinate = (point1, point2) => ({
  x: point1.x + point2.x,
  y: point1.y + point2.y,
});

/**
 * Calculate relative angle beetwen two points
 */
export const angleFromSource = source => (
  target => {
    let angle = Math.atan2(target.y - source.y, target.x - source.x) * 180 / Math.PI;
    if (angle < 0) {
      angle += 360;
    }
    return angle;
  }
);

/**
 * Define boxmodel object, usefull for absolute rendering coordinates, drag calculation etc...
 */
export const defineBox = (width, height) => {
  const edgeDistance = () => ({
    x: width / 2,
    y: height / 2,
  });

  const absoluteDrawCoordinate = (relativeDrawCoordinate) => (
    substractCoordinate(relativeDrawCoordinate, edgeDistance())
  );

  const relativeDrawCoordinateFromCursorDragHandle = (cursorPosition) => (
    addCoordinate(cursorPosition, edgeDistance())
  );

  const contain = (relativeDrawCoordinate, point) => (
    relativeDrawCoordinate.x - edgeDistance()
        .x < point.x && relativeDrawCoordinate.x + edgeDistance()
        .x > point.x && relativeDrawCoordinate.y - edgeDistance()
        .y < point.y && relativeDrawCoordinate.y + edgeDistance()
        .y > point.y
    );

  return {
    contain,
    edgeDistance,
    absoluteDrawCoordinate,
    relativeDrawCoordinateFromCursorDragHandle,
  };
};
