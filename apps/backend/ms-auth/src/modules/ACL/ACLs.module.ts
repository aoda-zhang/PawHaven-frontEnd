import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import GatewayDBCollections from 'src/models/auth.DBcollection'
import ACLController from './ACLs.controller'
import ACLService from './ACLs.service'
import { RoleSchema } from '@models/role.schema'
import { ResourceSchema } from '@models/resource.schema'
import { UserSchema } from '@models/user.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: GatewayDBCollections.ROLE, schema: RoleSchema },
            { name: GatewayDBCollections.RESOURCE, schema: ResourceSchema },
            { name: GatewayDBCollections.USER, schema: UserSchema }
        ])
    ],
    controllers: [ACLController],
    providers: [ACLService],
    exports: [ACLService]
})
export default class ACLModule {}
