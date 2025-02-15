import mongoose from 'mongoose';

const landlordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  governmentIdProofUrl: {
    type: String,
    required: true,
    
  },
  propertiesOwned: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property' 
  }],
  
  verified: {
    type: Boolean,
    default: false
  }

  
}, {timestamps: true});

export const Landlord = mongoose.model('Landlord', landlordSchema);
