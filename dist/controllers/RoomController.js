"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const roomRepository_1 = require("../repositories/roomRepository");
const subjectRepository_1 = require("../repositories/subjectRepository");
const videoRepository_1 = require("../repositories/videoRepository");
class RoomController {
    async create(req, res) {
        const { name, description } = req.body;
        try {
            const newRoom = roomRepository_1.roomRepository.create({ name, description });
            await roomRepository_1.roomRepository.save(newRoom);
            return res.status(201).json(newRoom);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal Sever Error' });
        }
    }
    async createVideo(req, res) {
        const { title, url } = req.body;
        const { idRoom } = req.params;
        try {
            const room = await roomRepository_1.roomRepository.findOneBy({ id: Number(idRoom) });
            if (!room) {
                return res.status(404).json({ message: 'Aula não existe' });
            }
            const newVideo = videoRepository_1.videoRepository.create({
                title,
                url,
                room,
            });
            await videoRepository_1.videoRepository.save(newVideo);
            return res.status(201).json(newVideo);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal Sever Error' });
        }
    }
    async roomSubject(req, res) {
        const { subject_id } = req.body;
        const { idRoom } = req.params;
        try {
            const room = await roomRepository_1.roomRepository.findOneBy({ id: Number(idRoom) });
            if (!room) {
                return res.status(404).json({ message: 'Aula não existe' });
            }
            const subject = await subjectRepository_1.subjectRepository.findOneBy({
                id: Number(subject_id),
            });
            if (!subject) {
                return res.status(404).json({ message: 'Disciplina não existe' });
            }
            const roomUpdate = {
                ...room,
                subjects: [subject],
            };
            await roomRepository_1.roomRepository.save(roomUpdate);
            return res.status(204).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal Sever Error' });
        }
    }
    async list(req, res) {
        try {
            const rooms = await roomRepository_1.roomRepository.find({
                relations: {
                    subjects: true,
                    videos: true,
                },
            });
            return res.json(rooms);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal Sever Error' });
        }
    }
}
exports.RoomController = RoomController;
