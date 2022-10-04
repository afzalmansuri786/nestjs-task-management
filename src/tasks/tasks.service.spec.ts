import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { Task } from './entity/task.entity';
import { TasksRepository } from './repository/tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
});

 
describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: TasksRepository;

  beforeEach(async () => {
    //initilize a NestJS module with tasksService and tasksRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useValue: mockTasksRepository,
        },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    // tasksRepository = module.get(TasksRepository);
    jest.clearAllMocks()
});
it('should be defined', () => {
  expect(tasksService).toBeDefined()
  expect(tasksRepository).toBeDefined();

})
    describe('getTasks', () => {
      const response: Task[] = [
        {
          id: '2vsfv541fdvjnfvdf',
          title: 'string',
          description: 'string',
          status: 'string',
          user: mockUser,
        },
      ];

      it('calls TasksRepository.getTasks and return the result', async () => {
        const tasks = await tasksService.getTasks(null, mockUser);
        expect(response).toStrictEqual(tasks);
      });
    });
  
});
