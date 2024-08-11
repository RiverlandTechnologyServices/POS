import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Category from './Category'

const Categories = ({categories, onCategoryChange}) => {
  const [categoriesElements, setCategoriesElements] = useState(null)
  const [activeElement, setActiveElement] = useState("")

  const setElement = (element) => 
  {
    onCategoryChange(element);
    setActiveElement(element);
  }

  useEffect(() => {
    if(categories[0])
    {
      if(!categoriesElements)
      {
        setElement(categories[0].category_id);
      }
      var categoriesTemp = [];
    
      for(const category in categories)
      {
        categoriesTemp.push((<Category key={categories[category].category_id} id={categories[category].category_id} active={activeElement} handlePress={(id) => setElement(id)}>{categories[category].category_name}</Category>))
      }
  
      setCategoriesElements(categoriesTemp);
    }
  }, [activeElement, categories])
  
  return (
    <ScrollView>
      {categoriesElements}
    </ScrollView>
  )
}

export default Categories