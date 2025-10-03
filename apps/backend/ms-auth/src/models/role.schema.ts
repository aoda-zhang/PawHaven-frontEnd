import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import CommonSchema from './common.schema'
import AuthDBCollections from './auth.DBcollection'

@Schema({ collection: AuthDBCollections.ROLE, timestamps: true })
export class Role extends CommonSchema {
    @Prop({
        required: true,
        unique: true,
        type: String
    })
    name: string

    @Prop({
        required: true,
        type: String
    })
    desc: string

    @Prop({
        required: true,
        type: [String]
    })
    permissions: string[]
}
export const RoleSchema = SchemaFactory.createForClass(Role)
