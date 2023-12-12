const errorHandler = (error, res) => {
  if (error instanceof Error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  } else {
    const errorStr = error.toString();
    console.error(errorStr);
    res.status(500).json({ error: errorStr });
  }
};

export default errorHandler;
