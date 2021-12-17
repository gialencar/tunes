function tw(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default tw;
