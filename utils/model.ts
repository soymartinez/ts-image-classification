import * as mobilenet from '@tensorflow-models/mobilenet'
import '@tensorflow/tfjs'

export async function loadModel(imageElement: any) {
    var model = null

    if (model === null) model = await mobilenet.load()

    const predictions = await model.classify(imageElement)

    return predictions
}
