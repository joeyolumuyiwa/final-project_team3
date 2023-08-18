export const compare_to_sort = arr => {
    let sortedLibrary = arr.sort( (obj1, obj2) => {
      let obj1Title = obj1.name.toLowerCase(); 
      let obj2Title = obj2.name.toLowerCase(); 
      if (obj1Title < obj2Title) {return -1}
      else if (obj1Title > obj2Title) {return 1}
      return 0;
    });
    return sortedLibrary;
  }