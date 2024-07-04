import { Test, TestingModule } from '@nestjs/testing';
import { ItemAttributesService } from './item-attributes.service';

describe('ItemAttributesService', () => {
  let service: ItemAttributesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemAttributesService],
    }).compile();

    service = module.get<ItemAttributesService>(ItemAttributesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
