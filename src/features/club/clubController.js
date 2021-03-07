import sequelize from 'sequelize';

import db from '../../db/models';
import { handleResponse } from '../helpers/handleResponse';

class Club {
  static async createClub(req, res) {
    const clubDetails = {
      name: req.body.name,
      address: req.body.address,
      userId: req.user.id,
    };

    const club = await db.Club.create(clubDetails);
    return handleResponse(res, 201, true, 'Club successfully created', club);
  }

  static async getUserClub(req, res) {
    const club = await db.Club.findAll({
      where: {
        userId: req.user.id,
      },
    });
    return handleResponse(res, 201, true, 'Club successfully retrieved', club);
  }

  static async getMemberAnalytics(req, res) {
    const club = await db.ClubMember.findAll({
      attributes: [
        [sequelize.fn('count', sequelize.col('ClubMember.id')), 'memberCount'],
      ],
      where: {
        userId: req.user.id,
      },
      group: ['ClubMember.createdAt'],
    });
    return handleResponse(res, 201, true, 'Club successfully retrieved', club);
  }

  // Removing member from club using soft delete functionality

  static async removeMember(req, res) {
    const club = await db.ClubMember.findAll({
      attributes: [
        [sequelize.fn('count', sequelize.col('ClubMember.id')), 'memberCount'],
      ],
      where: {
        userId: req.user.id,
      },
      group: ['ClubMember.createdAt'],
    });
    return handleResponse(res, 201, true, 'Club successfully retrieved', club);
  }
}

export default Club;
