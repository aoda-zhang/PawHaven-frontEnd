import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'

import ACLModule from '@modules/ACL/ACLs.module'
import UserModule from '@modules/User/user.module'
import { AuthController } from './auth.controller'
import AuthService from './auth.service'
import AuthDBCollections from '@models/auth.DBcollection'
import { UserSchema } from '@models/user.schema'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: AuthDBCollections.USER, schema: UserSchema }]),
        JwtModule,
        ACLModule,
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export default class AuthModule {}
