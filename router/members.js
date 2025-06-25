import express from 'express';
import { Member } from '../models/Members.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching members' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newMember = new Member(req.body);
    const savedMember = await newMember.save();
    res.json(savedMember);
  } catch (error) {
    res.status(400).json({ message: 'Error saving member', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMember) return res.status(404).json({ message: 'Member not found' });
    res.json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: 'Error updating member', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);
    if (!deletedMember) return res.status(404).json({ message: 'Member not found' });
    res.json({ message: 'Member deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting member', error: error.message });
  }
});

export default router;