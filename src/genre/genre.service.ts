import { Injectable } from '@nestjs/common';
import CreateGenreDto from '../users/dto/create-genre.dto';
import GenreEntity from '../../db/genre.entity';

@Injectable()
export default class GenreServices {
    async insert(genreDetails: CreateGenreDto): Promise<GenreEntity> {

        const genreEntity: GenreEntity = GenreEntity.create();
        const { type } = genreDetails;

        genreEntity.type = type;
        await GenreEntity.save(genreEntity);
        return genreEntity;
    }
    async getAllGenre(): Promise<GenreEntity[]> {
        return await GenreEntity.find();
    }
}