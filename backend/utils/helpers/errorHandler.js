const errorHandler = (error, res) => {
  if (error instanceof Error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  } else {
    const message = error.toString();
    console.error(message);
    res.status(500).json({ message });
  }
};

export default errorHandler;
