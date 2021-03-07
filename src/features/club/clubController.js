import sequelize from 'sequelize';

import db from '../../db/models';
import { handleResponse } from '../helpers/handleResponse';
import sendMail from '../helpers/mail';
import ValidateToken from '../helpers/handleToken';

const numWeeks = 8;
const now = new Date();
const eightWeeks = now.setDate(now.getDate() + numWeeks * 7);
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
    // Find if the admin has a club
    const adminClub = await db.Club.findOne({
      userId: req.user.id,
    });

    if (!adminClub) {
      return handleResponse(res, 400, false, 'No club found for this admin');
    }

    const memberClub = await db.ClubMember.fineOne({
      where: {
        userId: req.params.userId,
        club: adminClub.id,
      },
    });

    if (!memberClub) {
      return handleResponse(
        res,
        400,
        false,
        'Member is not found in this club',
      );
    }

    await db.ClubMember.update(
      { active: false },
      {
        where: {
          userId: req.params.userId,
        },
      },
    );
    return handleResponse(
      res,
      201,
      true,
      'Member was successfully remove successfully',
    );
  }

  static async inviteMember(req, res) {
    // Find if the admin has a club
    const adminClub = await db.Club.findOne({
      userId: req.user.id,
    });

    if (!adminClub) {
      return handleResponse(res, 400, false, 'No club found for this admin');
    }

    await db.InviteUser.create({
      email: req.body.email,
      clubId: adminClub.id,
    });

    const user = await db.User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return handleResponse(res, 400, false, 'User do not exist');
    }

    const token = ValidateToken.generateToken(
      {
        id: user.id,
        clubId: adminClub.id,
        role: 'member',
      },
      eightWeeks,
    );

    const text = `Welcome ${req.body.email}, Please copy this link ${process.env.FRONTEND_URL}/member/register?token=${token} to get onboarded to ${adminClub.name} Club`;


    await sendMail({
      res,
      receiver: req.body.email,
      subject: `Invitation to Join ${adminClub.name}`,
      text,
    });

    return handleResponse(
      res,
      201,
      true,
      'Invitation was successfully sent',
    );
  }

  static async joinClub(req, res) {
    const user = await db.ClubMember.findOne({
      where: {
        userId: req.params.userId,
        clubId: req.params.clubId,
      },
    });

    if (user) {
      return handleResponse(
        res,
        400,
        false,
        'You have already joined',
      );
    }

    const member = await db.ClubMember.create({
      clubId: req.params.clubId,
      userId: req.params.userId,
    });

    return handleResponse(
      res,
      201,
      true,
      'You have successfully joined',
      member,
    );
  }
}

export default Club;
