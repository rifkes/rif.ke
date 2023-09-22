  const lerp = (start: number, end: number, amount: number) => {
    return (1 - amount) * start + amount * end;
  }

  export default lerp;