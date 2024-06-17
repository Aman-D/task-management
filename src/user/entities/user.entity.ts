import { Task } from 'src/task/entites/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((_type) => Task, (task) => task.user)
  task: Task;
}
