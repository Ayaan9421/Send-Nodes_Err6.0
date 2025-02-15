import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    
  },
  collegeName: {
    type: String,
    required: true
  },
  collegeIdProofUrl: {
    type: String,
    required: true,
    
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student' // Self-referencing to the Student model
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review' 
  }],
  communities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community' 
  }],
  currentPG: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }

  
}, {timestamps: true});

// Create the Student model
export const Student = mongoose.model('Student', studentSchema);
