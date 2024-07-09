import { Category } from 'src/entities/category.entity';
import { Attribute, AttributeType } from 'src/entities/attribute.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

export async function createDefaultCategoriesAndAttributes(
  user: User,
  categoriesRepository: Repository<Category>,
  attributesRepository: Repository<Attribute>,
): Promise<void> {
  const defaultCategories = [
    { name: 'Characters', isDefault: true, user },
    { name: 'Places', isDefault: true, user },
    { name: 'Events', isDefault: true, user },
  ];

  const categories = [];
  for (const categoryData of defaultCategories) {
    const category = categoriesRepository.create(categoryData);
    categories.push(await categoriesRepository.save(category));
  }

  const defaultAttributes = {
    Characters: [
      {
        name: 'name',
        type: AttributeType.STRING,
        isDefault: true,
        user,
        category: categories[0],
      },
      {
        name: 'DOB',
        type: AttributeType.DATE,
        isDefault: true,
        user,
        category: categories[0],
      },
      {
        name: 'description',
        type: AttributeType.TEXT,
        isDefault: true,
        user,
        category: categories[0],
      },
      {
        name: 'home',
        type: AttributeType.STRING,
        isDefault: true,
        user,
        category: categories[0],
      },
    ],
    Places: [
      {
        name: 'name',
        type: AttributeType.STRING,
        isDefault: true,
        user,
        category: categories[1],
      },
      {
        name: 'location',
        type: AttributeType.STRING,
        isDefault: true,
        user,
        category: categories[1],
      },
      {
        name: 'description',
        type: AttributeType.TEXT,
        isDefault: true,
        user,
        category: categories[1],
      },
      {
        name: 'characters involved',
        type: AttributeType.STRING,
        isDefault: true,
        user,
        category: categories[1],
      },
    ],
    Events: [
      {
        name: 'name',
        type: AttributeType.STRING,
        isDefault: true,
        user,
        category: categories[2],
      },
      {
        name: 'location',
        type: AttributeType.STRING,
        isDefault: true,
        user,
        category: categories[2],
      },
      {
        name: 'time',
        type: AttributeType.DATETIME,
        isDefault: true,
        user,
        category: categories[2],
      },
      {
        name: 'description',
        type: AttributeType.TEXT,
        isDefault: true,
        user,
        category: categories[2],
      },
      {
        name: 'characters involved',
        type: AttributeType.STRING,
        isDefault: true,
        user,
        category: categories[2],
      },
    ],
  };

  for (const categoryAttributes of Object.values(defaultAttributes)) {
    for (const attributeData of categoryAttributes) {
      const attribute = attributesRepository.create(attributeData);
      await attributesRepository.save(attribute);
    }
  }
}
