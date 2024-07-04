import { Test, TestingModule } from '@nestjs/testing';
import { ItemAttributesController } from './item-attributes.controller';

describe('ItemAttributesController', () => {
  let controller: ItemAttributesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemAttributesController],
    }).compile();

    controller = module.get<ItemAttributesController>(ItemAttributesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
